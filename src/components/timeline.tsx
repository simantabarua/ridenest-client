import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

interface TimelineEvent {
  event: string;
  time: string;
  color?: string;
}

function formatEventName(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/\sAt$/, " at");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TimeLine({ items = [] }: any) {
  const timelineItems: TimelineEvent[] = Array.isArray(items)
    ? items
    : Object.entries(items).map(([key, value]) => ({
        event: formatEventName(key),
        time: value,
        color: "text-blue-600",
      }));

  timelineItems.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return (
    <Timeline defaultValue={3}>
      {timelineItems.map((item, index) => (
        <TimelineItem key={index} step={index + 1}>
          <TimelineHeader>
            <TimelineSeparator />
            <TimelineTitle>{item.event}</TimelineTitle>
            <TimelineDate>{new Date(item.time).toLocaleString()}</TimelineDate>
            <TimelineIndicator className={item.color} />
          </TimelineHeader>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
