import Axios from "@/utils/axios";

export type CheckInStatus = "success" | "duplicate";

export interface UserInformationQRCode {
  id: string;
  firstname_th: string | null;
  surname_th: string | null;
  title_th: string | null;
  firstname_en: string | null;
  surname_en: string | null;
  title_en: string | null;
  ref_id: string | null;
  organization_th: string | null;
  organization_en: string | null;
  check_in_time: string;
  status: CheckInStatus;
  code: string;
  profile_image_url: string | null;
}

interface ParticipantInformationQRCodeProps {
  data: UserInformationQRCode;
  error: null;
  meta: null;
}

export async function getParticipantInformationQRCode(
  qrcode: string,
  token: string,
  eventId: string,
  scanned_location_lat: number,
  scanned_location_long: number
): Promise<UserInformationQRCode> {
  const response = await Axios.post<ParticipantInformationQRCodeProps>(
    `/participant/${qrcode}`,
    {
      event_id: eventId,
      scanned_location_lat,
      scanned_location_long,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}

export async function updateParticipantCommentQRCode(
  code: string,
  token: string,
  comment: string
) {
  const response = await Axios.put<ParticipantInformationQRCodeProps>(
    `/participant/comment`,
    {
      comment,
      one_time_code: code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
}
