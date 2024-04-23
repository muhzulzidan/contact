import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sooner} from "@/components/ui/sonner"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Toaster />
        <Sooner />
        <NextScript />
      </body>
    </Html>
  );
}
