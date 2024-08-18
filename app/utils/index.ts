export const extractUrls = (text: string): string[] => {
  const imageUrls = text.match(/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/ig)
  return Array.from(new Set(imageUrls || []))
}

export const extractImageUrls = async (text: string): Promise<string[]> => {
  const urls = extractUrls(text)
  const contentTypes = await Promise.all(urls.map(async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" })
      return response.headers.get("content-type") || ""
    } catch (e) {
      return ""
    }
  }))

  return urls.filter((_, index) => contentTypes[index]?.startsWith("image"))
}