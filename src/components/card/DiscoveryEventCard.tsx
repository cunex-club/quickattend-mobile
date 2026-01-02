import { usePageLoading } from "@/context/PageLoadingContext";
import { CalendarMonth, LocationOn, WatchLater } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface DiscoveryEventCardProps {
  id: string;
  name: string;
  date: string;
  timeRange: string;
  location: string;
  description: string;
}

export default function DiscoveryEventCard({
  id,
  name,
  date,
  timeRange,
  location,
  description,
}: DiscoveryEventCardProps) {
  const tEvent = useTranslations("event");
  const { showPageLoading } = usePageLoading();
  return (
    <Link
      onClick={() => {
        showPageLoading();
      }}
      key={id}
      className="w-full min-h-20 h-fit bg-neutral-100 rounded-4xl flex flex-col px-4 py-6 cursor-pointer overflow-visible"
      href={`/discovery/${id}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-1">
        <h2 className="title-large-emphasized text-neutral-600 break-all line-clamp-2">
          {name}
        </h2>
      </div>

      {/* Information */}
      <div className="flex flex-col gap-1 mb-4">
        {/* Date */}
        <div className="flex gap-2">
          <CalendarMonth
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600 break-all">
            {date}
          </p>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <WatchLater
            sx={{ width: 14, height: 14 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600 break-all">
            {timeRange}
          </p>
        </div>

        {/* Location */}
        <div className="flex gap-2">
          <LocationOn
            sx={{ width: 14, height: 18 }}
            className="text-primary translate-y-1"
          />
          <p className="body-medium-primary text-neutral-600 break-all line-clamp-2">
            vasfdasopdkasopdkasopdjkopasdjop[iasdjiopwasddj opweuj fopijweopfihj
            wedoipfhjerfoipfgvhjeodipfg jerodfjfgvoperjfg opierasdh fgiopvjed
            riopfgvj sdfiopgv jiopsdfgvj eiopd ghjiopdfhj giopdf jgiovj
            dfiopgujdfziog j sdfiogjiosdfjgiopsdfjgiosdfjiogvjsdfiogjdfiogjo
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col mb-4">
        <h2 className="title-medium-emphasized text-neutral-600">
          {tEvent("details")}
        </h2>
        <p className="body-small-primary text-neutral-600 break-all line-clamp-5">
          vasfdasopdkasopdkasopdjkopasdjop[iasdjiopwasddj opweuj fopijweopfihj
          wedoipfhjerfoipfgvhjeodipfg jerodfjfgvoperjfg opierasdh fgiopvjed
          riopfgvj sdfiopgv jiopsdfgvj eiopd ghjiopdfhj giopdf jgiovj
          dfiopgujdfziog j sdfiogjiosdfjgiopsdfjgiosdfjiogvjsdfiogjdfiogjo
        </p>
      </div>
    </Link>
  );
}
