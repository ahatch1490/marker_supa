import PIEXIF from 'piexifjs'

export const removeExifData = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const dataUrl = event.target?.result as string
        
        if (!dataUrl.startsWith('data:image/jpeg')) {
          resolve(file)
          return
        }
        
        const stripped = PIEXIF.remove(dataUrl)
        
        fetch(stripped)
          .then(res => res.blob())
          .then(blob => {
            const cleanFile = new File([blob], file.name, {
              type: file.type,
              lastModified: file.lastModified
            })
            resolve(cleanFile)
          })
          .catch(reject)
          
      } catch (error) {
        console.warn('Could not remove EXIF data:', error)
        resolve(file)
      }
    }
    
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const uploadImage = async (file: File, bucket: string = 'project-images'): Promise<string> => {
  const { supabase } = await import('./supabase')
  
  const cleanFile = await removeExifData(file)
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, cleanFile)
    
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)
    
  return publicUrl
}