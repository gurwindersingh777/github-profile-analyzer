"use client";

import { useRef, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { ExportProfile } from "../export/export-profile";
import { ProcessedGitHubData } from "@/types";
import { exportImage } from "@/hooks/useExportImage";

export function DownloadProfileButton({ data }: { data: ProcessedGitHubData }) {
  const exportRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    if (!exportRef.current) return

    try {
      setDownloading(true)

      await exportImage({
        element: exportRef.current,
        fileName: `${data.user.login}-github-profile.png`,
      })
    } finally {
      setDownloading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 text-sm font-bold text-card-foreground shadow-brutal-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal disabled:pointer-events-none disabled:opacity-50"
      >
        {downloading ?
          <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</>
          :
          <><Download className="h-4 w-4" /> Download Report</>
        }


      </button>

      <div className="fixed left-[-99999px] top-0" aria-hidden>
        <ExportProfile
          ref={exportRef}
          data={data}
        />
      </div>
    </>
  )
}