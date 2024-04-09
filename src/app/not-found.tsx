import Announcer from "@/components/Commons/Announcer";

export default function NotFound() {
  return (
    <Announcer>
      No path exists!{" "}
      <a href="/" className="hover:text-slate-900">
        Return to home
      </a>
    </Announcer>
  );
}
