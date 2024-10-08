"use client"
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

import { Input } from "@/components/ui/input"

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import { Check, BadgeDollarSign, Bath, Bus, CarFront, ChartCandlestick, Cherry, Drama, FerrisWheel, Fuel, GraduationCap, HandCoins, Hospital, House, IceCreamCone, Laptop, Plane, Shirt, ShoppingCart, SmartphoneNfc, TentTree, TramFront, Utensils, Square } from "lucide-react";

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

export default function CategoryDialog({open, onClose}) {
  const [categories, setCategories] = useState([])
  const [icon, setIcon] = useState("home")
  const [color, setColor] = useState("blue")
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [editingCategory, setEditingCategory] = useState()


  function loadList() {
    fetch("https://expense-tracker-service.vercel.app/categories")
      .then(res => res.json())
      .then((data) => { setCategories(data) })
  }

  function reset() {
    setColor("blue");
    setIcon("home");
    setNewCategory("")
    setEditingCategory(null)
  }
  function closeDialog(){
    reset()
    onClose(false)
  }

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
        toast("Category has been created successfully.")
        reset()
      })
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


  // const date = new Date()
  useEffect(() => {
    if (editingCategory) {
      setOpen(true);
      setNewCategory(editingCategory.name);
      setIcon(editingCategory.icon);
      setColor(editingCategory.color)
    }
  }, [editingCategory])


  return (
    <main className="flex gap-10">
      <Toaster />
      <Dialog open={open}>
        <DialogContent onClose={closeDialog}>
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
