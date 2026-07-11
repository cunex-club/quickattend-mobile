import type {
  BarcodeFormat,
  BrowserMultiFormatReader,
  IScannerControls,
} from "@zxing/browser";

type ZXingDecodeError = {
  name?: string;
  message?: string;
};

type ZXingDecodePayload = {
  text: string;
  format?: string;
};

type ZXingScannerConfig = {
  delayBetweenScanAttempts?: number;
  delayBetweenScanSuccess?: number;
};

type ZXingScannerStartOptions = ZXingScannerConfig & {
  videoElement: HTMLVideoElement | string;
  deviceId?: string;
  formats?: BarcodeFormat[];
  onDecode: (payload: ZXingDecodePayload) => void;
  onError?: (error: ZXingDecodeError) => void;
};

const SCAN_LOOP_ERRORS = new Set([
  "NotFoundException",
  "ChecksumException",
  "FormatException",
]);

const isScanLoopError = (error: ZXingDecodeError): boolean => {
  if (!error.name) {
    return false;
  }

  return SCAN_LOOP_ERRORS.has(error.name);
};

export class ZXingScanner {
  private reader: BrowserMultiFormatReader | null = null;
  private controls: IScannerControls | null = null;

  async start({
    videoElement,
    deviceId,
    formats,
    onDecode,
    onError,
    delayBetweenScanAttempts,
    delayBetweenScanSuccess,
  }: ZXingScannerStartOptions): Promise<void> {
    if (typeof window === "undefined") {
      throw new Error("ZXing scanner can only run in the browser.");
    }

    if (this.controls) {
      this.stop();
    }

    const { BrowserMultiFormatReader } = await import("@zxing/browser");

    const reader = new BrowserMultiFormatReader(undefined, {
      delayBetweenScanAttempts,
      delayBetweenScanSuccess,
    });

    if (formats?.length) {
      reader.possibleFormats = formats;
    }

    const controls = await reader.decodeFromVideoDevice(
      deviceId,
      videoElement,
      (result, error, loopControls) => {
        if (result) {
          onDecode({
            text: result.getText(),
            format: result.getBarcodeFormat().toString(),
          });
          return;
        }

        if (!error || isScanLoopError(error)) {
          return;
        }

        onError?.({
          name: error.name,
          message: error.message,
        });

        loopControls.stop();
      }
    );

    this.reader = reader;
    this.controls = controls;
  }

  stop(): void {
    this.controls?.stop();
    this.controls = null;
    this.reader = null;
  }

  get isScanning(): boolean {
    return this.controls !== null;
  }

  static async listVideoInputDevices(): Promise<MediaDeviceInfo[]> {
    const { BrowserMultiFormatReader } = await import("@zxing/browser");

    return BrowserMultiFormatReader.listVideoInputDevices();
  }
}

export const createZXingScanner = () => new ZXingScanner();

export type {
  BarcodeFormat,
  ZXingDecodePayload,
  ZXingScannerConfig,
  ZXingScannerStartOptions,
};
