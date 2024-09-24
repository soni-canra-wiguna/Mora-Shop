"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "@/server/api/routers/product"
import { z } from "zod"
import { api } from "@/trpc/react"
import { toast } from "@/hooks/use-toast"
import { FileUpload } from "@/components/file-upload"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/loading-button"

type InferCreateProduct = z.infer<typeof productSchema.create>

export const CreateProductForm = () => {
  const ctx = api.useUtils()
  const defaultValues = {
    image: "",
    name: "",
    priceInGold: 0,
  }

  const form = useForm<InferCreateProduct>({
    resolver: zodResolver(productSchema.create),
    defaultValues,
  })

  const {
    isPending,
    mutate: createProduct,
    isError,
  } = api.product.createProduct.useMutation({
    onSuccess: () => {
      form.reset(defaultValues)
      toast({ title: "berhasil membuat produk" })
      ctx.product.getProducts.invalidate()
    },
  })

  const onSubmit = (data: InferCreateProduct) => {
    try {
      createProduct(data)
    } catch (error) {
      console.log("[FAILED TO SUBMIT PRODUCT]", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUpload
                    endpoint="product"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nama produk</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="masukkan nama produk"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="priceInGold"
          render={({ field }) => {
            return (
              <FormItem className="flex-1">
                <FormLabel>Harga dalam gold</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="masukkan nominal harga, contoh: 20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <LoadingButton
          type="submit"
          loading={isPending}
          disabled={isPending}
          className="w-full capitalize"
        >
          tambah produk
        </LoadingButton>
      </form>
    </Form>
  )
}
