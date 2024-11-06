"use client"
import { useQueryState } from 'nuqs'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Check, BadgeDollarSign, Bath, Bus, CarFront, ChartCandlestick, Cherry, Drama, FerrisWheel, Fuel, GraduationCap, HandCoins, Hospital, House, IceCreamCone, Laptop, Plane, Shirt, ShoppingCart, SmartphoneNfc, TentTree, TramFront, Utensils, Pencil, Trash2, ArrowBigRightDash } from "lucide-react";
import { RecordDialog } from "@/components/recordDialog";
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams, useRouter } from 'next/navigation'
import { CurrencyDisplay } from '@/components/currency-format';

const categoryIcons = [
  { name: "transportation", Icon: Bus },
  { name: "ferriswheel", Icon: FerrisWheel },
  { name: "drama", Icon: Drama },
  { name: "phone", Icon: SmartphoneNfc },
  { name: "chart", Icon: ChartCandlestick },
  { name: "restaurant", Icon: Utensils },
  { name: "cherry", Icon: Cherry },
  { name: "ice-cream", Icon: IceCreamCone },
  { name: "car", Icon: CarFront },
  { name: "shopping", Icon: ShoppingCart },
  { name: "shirt", Icon: Shirt },
  { name: "dollar", Icon: BadgeDollarSign },
  { name: "fuel", Icon: Fuel },
  { name: "plane", Icon: Plane },
  { name: "train", Icon: TramFront },
  { name: "bathroom", Icon: Bath },
  { name: "coins", Icon: HandCoins },
  { name: "tent", Icon: TentTree },
  { name: "graduation", Icon: GraduationCap },
  { name: "laptop", Icon: Laptop },
  { name: "hospital", Icon: Hospital },
  { name: "home", Icon: House }
]
const categoryColors = [{ name: "blue", value: "#0166FF" }, { name: "light-blue", value: "#01B3FF" },
{ name: "green", value: "#41CC00" }, { name: "yellow", value: "#F9D100" }, { name: "orange", value: "#FF7B01" }, { name: "purple", value: "#AE01FF" }, { name: "red", value: "#FF0101" },]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState("home")
  const [color, setColor] = useState("blue")
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [editingCategory, setEditingCategory] = useState()
  const [transactions, setTransactions] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filterType, setFilterType] = useQueryState("filterType")
  const [categoryId, setCategoryId] = useQueryState("categoryId")
  const [isPressed, setIsPressed]=useState( false)

  function loadList() {
    fetch("https://expense-tracker-service.vercel.app/categories")
      .then(res => res.json())
      .then((data) => { setCategories(data) })
  }

  function loadTransactions() {
    fetch("https://expense-tracker-service.vercel.app/transaction")
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
  }


  function reset() {
    setColor("blue");
    setIcon("home");
    setNewCategory("")
    setEditingCategory(null)
  }

  useEffect(() => {
    loadList()
  }, [])

  function createNew() {
    setLoading(true)
    fetch(`https://expense-tracker-service.vercel.app/categories`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newCategory,
          color: color,
          icon: icon
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then(() => {
        loadList();
        setLoading(false)
        setOpen(false);
        toast("Category has been created successfully.")
        reset()
      })
  }

  function deleteCategory(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`https://expense-tracker-service.vercel.app/categories/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then((res) => {
          if (res.status === 204) {
            loadList();
            toast('Success')
          }
          else {
            toast.error("ajskdljalksdjalskd skjks")
          }
        })
    }
    else { }
  }

  function updateCategory() {
    setLoading(true)

    fetch(`https://expense-tracker-service.vercel.app/categories/${editingCategory.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ newName: newCategory, color: color, icon: icon }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      }
    )
      .then(() => {
        loadList();
        setLoading(false);
        setOpen(false);
        toast("Successfully updated.");
        reset()
      })
  }

  function deleteTransaction(id) {
    const confirmation = confirm("Are you sure to delete?")
    if (confirmation === true) {
      fetch(`https://expense-tracker-service.vercel.app/transaction/${id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(() => { loadTransactions() })
    }
    else { }
  }

  function loadTransactionsFiltered(categoryId) {
    fetch(`https://expense-tracker-service.vercel.app/transaction?categoryId=${categoryId}`)
      .then(res => res.json())
      .then((data) => { setTransactions(data) })
  }

  function loadTransactionsFilteredByType(filterType) {
    if (filterType === "EXPENSE" || filterType === "INCOME") {
      fetch(`https://expense-tracker-service.vercel.app/transaction?filterType=${filterType}`)
        .then(res => res.json())
        .then((data) => { setTransactions(data) })
    }
    else {
      loadTransactions()
    }
  }

  function loadTransactionsFilteredBy2(filterType, categoryId) {
    console.log(filterType, categoryId)
    if (filterType === "EXPENSE" || filterType === "INCOME") {
      fetch(`https://expense-tracker-service.vercel.app/transaction?filterType=${filterType}&categoryId=${categoryId}`)
        .then(res => res.json())
        .then((data) => { setTransactions(data) })
    }
    else {
      loadTransactionsFiltered(categoryId)
    }
  }

  function toggleCategoryId(id) {
    if (id === categoryId) {
      setCategoryId(null)
    }
    else {
      setCategoryId(id)
    }
  }

  // const date = new Date()
  useEffect(() => {
    if (editingCategory) {
      setOpen(true);
      setNewCategory(editingCategory.name);
      setIcon(editingCategory.icon);
      setColor(editingCategory.color)
    }
  }, [editingCategory])

  useEffect(() => {
    if (categoryId && filterType) { loadTransactionsFilteredBy2(filterType, categoryId) }
    else if (categoryId) {
      loadTransactionsFiltered(categoryId)
    }
    else if (filterType) { loadTransactionsFilteredByType(filterType) }

    else {
      loadTransactions()
    }
  }, [categoryId, filterType])

  return (
    <main>
      <div className="flex gap-10  bg-slate-200 w-full px-[5%] py-8">
        <RecordDialog onComplete={loadTransactions} />
        <Toaster richColors />
        <Card className="bg-slate-100">
          <CardHeader>
            <CardTitle>Records</CardTitle>
            <Button onClick={() => router.push(`?create=new`)}>+Add</Button>
          </CardHeader>
          <CardContent>
            <p className='font-bold py-4'>Types</p>
            <RadioGroup value={filterType} onValueChange={(val) => setFilterType(val)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ALL" id="option-one" />
                <Label htmlFor="option-one">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="INCOME" id="option-two" />
                <Label htmlFor="option-two">Income</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="EXPENSE" id="option-three" />
                <Label htmlFor="option-three">Expense</Label>
              </div>
            </RadioGroup>
            <p className='font-bold py-4'>Categories</p>
            {categories.map((category) => (
              <div key={category.id} className="flex gap-2 mb-1">
                <Button onClick={() => setEditingCategory(category)} className="bg-slate-400">
                  <Pencil className='w-4' />
                </Button>
                <Button onClick={() => deleteCategory(category.id)} className="bg-slate-400">
                  <Trash2 className='w-4' />
                </Button>

                <div onClick={() => toggleCategoryId(category.id)} className="flex justify-between w-full">
                  <div className='flex gap-2'>
                    <CategoryIcon iconName={category.icon} color={category.color} />
                    {category.name}
                  </div>
                  <ArrowBigRightDash />
                </div>

              </div>
            ))}
            {/* add new category button */}
            <Button onClick={() => { reset(); setOpen(true) }} variant="outline" className="my-4">
              + Add New Category
            </Button>
            <Dialog open={open}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                  <hr />
                  <DialogDescription className="flex gap-4">
                    <Popover>
                      <PopoverTrigger><CategoryIcon iconName={icon} color={color} /></PopoverTrigger>
                      <PopoverContent >
                        <div className="grid grid-cols-4 gap-2">
                          {categoryIcons.map(({ name, Icon }) =>
                            <div className={`relative w-8 h-8 flex justify-center items-center rounded-lg
                      ${icon === name ? "bg-blue-300 border-blue-950" : ""}`} value={name} key={name}
                              onClick={() => setIcon(name)}>
                              {<Icon />}
                            </div>)}
                        </div>
                        <hr className="my-4" />
                        <div className="flex gap-1">
                          {categoryColors.map(({ name, value }) =>
                            <div key={name} className="rounded-full h-8 w-8 flex justify-center items-center" style={{ background: value }}
                              onClick={() => setColor(name)}>
                              {color === name && <Check className="text-white w-4" />}
                            </div>)}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input placeholder="Name" type="text" value={newCategory} disabled={loading}
                      onChange={(event) => { setNewCategory(event.target.value) }} />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  {editingCategory ? (
                    <Button onClick={updateCategory} className="bg-green-700 hover:bg-green-900" disabled={loading}>Update</Button>
                  ) : (
                    <Button onClick={createNew} className="bg-green-700 hover:bg-green-900" disabled={loading}>Add</Button>
                  )}
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>


        <div className='w-full'>
          {transactions.map((transaction) => (
            <div key={transaction.id}>
              <p className='font-bold'>{transaction.date.split('T')[0]}</p>
              <Card className="w-full mb-4 pt-4">
                <CardContent className="flex justify-between items-center ">
                  <div className='flex items-center gap-2'>
                    <Checkbox />
                    <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ background: transaction.color }}>
                      <CategoryIcon iconName={transaction.icon} className="text-white" />
                    </div>
                    <div>
                      <p>{transaction.name}</p>
                      <p className='text-slate-500'>{transaction.time.split(':')[0]}:{transaction.time.split(':')[1]}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'> 
                    <div className={transaction.type=="INCOME" ? "text-green-800": "text-red-700"}
                    ><CurrencyDisplay amount={transaction.amount} /></div>      
                    
                    <Button onClick={() => router.push(`?editing=${transaction.id}`)} className="bg-slate-400">
                      <Pencil className='w-4' />
                    </Button>
                    <Button onClick={() => deleteTransaction(transaction.id)} className="bg-slate-400">
                      <Trash2 className='w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          ))}
        </div>
      </div>
    </main>
  );
}
function CategoryIcon({ iconName, color }) {
  const iconObject = categoryIcons.find((item) => item.name === iconName)
  const colorObject = categoryColors.find((item) => item.name === color)
  if (!iconObject) { return <House /> }

  let hexcolor;
  if (!colorObject) { hexcolor = "#000" }
  else { hexcolor = colorObject.value }
  const { Icon } = iconObject
  return <Icon style={{ color: hexcolor }} />
}
