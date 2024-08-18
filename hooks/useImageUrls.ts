import { extractImageUrls } from "@/utils"
import { useEffect, useState } from "react"

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