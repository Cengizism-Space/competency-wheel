import React from "react";

interface AnnouncerProps {
  children: React.ReactNode | string;
}

const Announcer: React.FC<AnnouncerProps> = ({ children }) => (
  <section className="flex items-stretch w-full">
    <p className="mx-auto rounded bg-slate-600 text-white px-8 py-6 text-lg font-medium">
      {children}
    </p>
  </section>
);

export default Announcer;