import { extractImageUrls } from "@/utils"
import { useEffect, useState } from "react"

/**
 * Retreives all unique image urls from the specified text string
 */
const useImageUrls = (text: string): string[] => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const evaluateImageUrls = async () => {
    setImageUrls(await extractImageUrls(text))
  }

  useEffect(() => {
    evaluateImageUrls()
  }, [text])

  return imageUrls
}

export default useImageUrls