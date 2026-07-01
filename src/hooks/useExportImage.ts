"use client";

import { toPng } from "html-to-image";

interface ExportOptions {
  element: HTMLElement
  fileName: string
}

export async function exportImage({ element, fileName }: ExportOptions) {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
  })

  const link = document.createElement("a")
  link.download = fileName
  link.href = dataUrl
  link.click()
}