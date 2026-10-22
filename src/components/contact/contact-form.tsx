"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const greeting = name.trim() ? `Hi, I'm ${name.trim()}.` : "Hi!";
    window.open(
      whatsappLink(`${greeting} ${message.trim()}`),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Your name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Asha Sharma"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you're looking for…"
          rows={5}
          required
        />
      </div>
      <Button type="submit" size="lg" className="h-11 w-full gap-2">
        <WhatsAppIcon className="size-4" />
        Send via WhatsApp
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Your message opens in WhatsApp — nothing is stored on this site.
      </p>
    </form>
  );
}
