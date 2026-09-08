"use client";

import { useState } from "react";
import SpecularButton from "@/components/specular-button";
import SmoothInput from "@/components/smooth-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MdPerson, MdMailOutline, MdLocationOn } from "react-icons/md";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, details }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setFullName("");
      setEmail("");
      setDetails("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 scroll-mt-24">
      <div className="relative z-10 container px-4 md:px-6 mx-auto">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">

          <h2 className="text-white mb-6 text-3xl font-light tracking-tight md:text-4xl lg:text-5xl">
            Let&apos;s build something amazing
          </h2>
          <p className="text-white/55 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            Have a project in mind, a question, or just want to connect?
            <br />
            I&apos;d love to hear from you.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2 text-white/60 text-base">
            <a
              href="mailto:aryanfulari@gmail.com"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MdMailOutline className="w-4 h-4" />
              aryanfulari@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MdLocationOn className="w-4 h-4" />
              Pune, Maharashtra, India
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <Card className="border-white/10 bg-white/[0.02] overflow-hidden rounded-3xl shadow-lg backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 md:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-base font-medium text-white/80">
                    Your full name
                  </Label>
                  <div className="relative">
                    <MdPerson className="text-white/40 absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 z-10" />
                    <SmoothInput
                      id="fullName"
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="pl-7"
                      wrapperClassName="py-2.5"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-base font-medium text-white/80">
                    Your email address
                  </Label>
                  <div className="relative">
                    <MdMailOutline className="text-white/40 absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 z-10" />
                    <SmoothInput
                      id="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-7"
                      wrapperClassName="py-2.5"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="details" className="text-base font-medium text-white/80">
                    Message details
                  </Label>
                  <Textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                    className="bg-white/[0.03] border-white/10 text-white placeholder:text-white/30 min-h-[140px] resize-y p-4"
                  />
                </div>

                <SpecularButton
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 h-12 w-full"
                  size="md"
                  radius={16}
                  tint="#ffffff"
                  tintOpacity={0.1}
                  textColor="#ffffff"
                  lineColor="#ffffff"
                  baseColor="#525252"
                  intensity={1.6}
                  shineSize={23}
                  shineFade={51}
                  thickness={3.3}
                  speed={0.65}
                  followMouse={false}
                  proximity={250}
                  autoAnimate
                >
                  {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send message"}
                </SpecularButton>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong — please try again.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
