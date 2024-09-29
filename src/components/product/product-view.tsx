"use client"

import { ItemProductProps } from "@/components/list-products"
import { GetProducts } from "@/services/product/get-product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Loader2, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

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
import { FileUpload } from "@/components/file-upload"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/loading-button"
import { InferCreateProduct, productSchema } from "./create-product-form"

const DeleteProdut = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteProduct,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async () => {
      await axios.delete(`/api/products/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      toast({
        description: "product was deleted!!",
      })
    },
    onError: () => {
      toast({
        description: "something went wrong, try again!!",
      })
    },
  })

  return (
    <Button onClick={() => deleteProduct()} size="icon" variant="neutral">
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash className="size-4" />
      )}
    </Button>
  )
}

const EditProduct = ({ id, name, image, priceInGold }: ItemProductProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const defaultValues = {
    image: image,
    name: name,
    priceInGold: priceInGold,
  }

  const form = useForm<InferCreateProduct>({
    resolver: zodResolver(productSchema.create),
    defaultValues,
  })

  const {
    isPending,
    mutate: createProduct,
    isError,
  } = useMutation({
    mutationFn: async (data: InferCreateProduct) => {
      await axios.patch(`/api/products/${id}`, data)
    },
    onSuccess: () => {
      form.reset(defaultValues)
      toast({
        title: "Produk di edit",
        description: "Produk berhasil di edit",
      })
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["purchases"] })
      setIsOpen(false)
    },
    onError: () => {
      toast({
        title: "Gagal mengedit produk",
        description: "Gagal mengedit produk, pastikan koneksimu lancar",
        variant: "destructive",
      })
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="neutral">
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              edit produk
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const Product = (props: ItemProductProps) => {
  return (
    <Card className="flex flex-col gap-4">
      <CardContent className="aspect-square w-full overflow-hidden border-b-2 border-border p-0">
        <img
          src={props.image}
          alt={props.name}
          className="h-full w-full object-cover"
        />
      </CardContent>
      <CardFooter className="justify-between">
        <span>price : {props.priceInGold} 🪙</span>
        <div className="flex items-center gap-2">
          <EditProduct {...props} />
          <DeleteProdut id={props.id!} />
        </div>
      </CardFooter>
    </Card>
  )
}

export const ProductView = () => {
  const { data, isPending, isError } = GetProducts()
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {isPending ? (
        <div>loading...</div>
      ) : (
        data?.map((product) => {
          return <Product {...product} key={product.id} />
        })
      )}
    </div>
  )
}
