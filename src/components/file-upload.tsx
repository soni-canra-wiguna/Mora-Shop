"use client"

import { toast } from "@/hooks/use-toast"
import { UploadButton, UploadDropzone } from "@/lib/uploadthing"
import { Card } from "./ui/card"

interface FileUploadProps {
  onChange: (url?: string) => void
  value: string
  endpoint: "product"
}

export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  if (value) {
    return (
      <Card className="relative h-[189px] w-full overflow-hidden bg-white dark:bg-darkBg">
        <img
          src={value}
          alt="preview image"
          className="size-full object-cover object-center"
        />
        <UploadButton
          endpoint={endpoint}
          className="ut-button:text-background ut-button:focus-within:ring-primary ut-allowed-content:text-background ut-button:bg-main ut-button:shadow-md ut-allowed-content:hidden"
          appearance={{
            container: "absolute bottom-2 right-2",
          }}
          onClientUploadComplete={(res) => {
            if (!res) return
            onChange(res[0]?.url)
            toast({
              title: "success",
              description: `berhasil mengupdate gambar`,
              // variant: "success",
            })
          }}
          onUploadError={(error: Error) => {
            console.log(error)
            toast({
              title: "failed",
              description: `gagal update gambar`,
              variant: "destructive",
            })
          }}
        />
      </Card>
    )
  }

  return (
    <UploadDropzone
      className="ut-allowed-content:text-paragraph ut-button:text-background !rounded-base !border-2 !border-solid !border-border !bg-transparent !text-black !shadow-light ut-button:bg-main ut-label:font-medium ut-label:text-main ut-upload-icon:text-main/50 dark:!border-darkBorder dark:!shadow-dark"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res) return
        onChange(res[0]?.url)
        toast({
          title: "succes uploaded",
          // variant: "success",
        })
      }}
      onUploadError={(error: Error) => {
        toast({
          title: "failed",
          description: `gagal menambahkan gambar`,
          variant: "destructive",
        })
      }}
    />
  )
}
