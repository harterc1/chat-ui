import { extractContentTypes, extractUrls } from "@/utils"
import { useEffect, useRef, useState } from "react"

/**
 * Retrieves all unique image urls from the specified text string
 */
const useImageUrls = (text: string): string[] => {
  
  // Mapping of urls, each to a boolean value indicating
  // whether they refer to an image or not
  const urlCache = useRef<Record<string, boolean>>({})

  const [imageUrls, setImageUrls] = useState<string[]>([])

  const evaluateImageUrls = async () => {
    const urls = extractUrls(text)

    const unknownUrls = urls.filter(url => typeof urlCache.current[url] === "undefined")

    const contentTypes = await extractContentTypes(unknownUrls)

    contentTypes.forEach((contentType, index) => {
      urlCache.current[unknownUrls[index]!] = contentType.startsWith("image")
    })

    const imageUrls = urls.filter(url => urlCache.current[url])

    setImageUrls(imageUrls)
  }

  useEffect(() => {
    evaluateImageUrls()
  }, [text])

  return imageUrls
}

export default useImageUrls