import { useSearchParams, useRouter } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

export function RecordDialog({ onComplete }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const create = searchParams.get('create')
    const editingId = searchParams.get('editing')
    const open = create === "new" || editingId

    const [amount, setAmount] = useState()
    const [categoryId, setCategoryId] = useState()
    const [type, setType] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [payee, setPayee] = useState()
    const [note, setNote] = useState()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    function loadList() {
        fetch("https://expense-tracker-service.vercel.app/categories")
            .then(res => res.json())
            .then((data) => { setCategories(data) })
    }

    useEffect(() => {
        loadList()
    }, [])

    useEffect(() => {
        if (editingId) {
            getTransactionById(editingId)
        }
    }, [editingId])

    function getTransactionById(editingId) {
        // console.log(editingId)
        fetch(`https://expense-tracker-service.vercel.app/transaction/${editingId}`)
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setAmount(data.amount);
                setCategoryId(data.categoryid);
                setType(data.type);
                setDate(data.date.split('T')[0]);
                setTime(data.time)
                setPayee(data.payee)
                setNote(data.note)
            })
    }

    function reset() {
        setAmount();
        setCategoryId();
        setType();
        setDate();
        setTime()
        setPayee()
        setNote()
    }

    function createNewTransaction() {
        setLoading(true)
        fetch(`https://expense-tracker-service.vercel.app/transaction`,
            {
                method: "POST",
                body: JSON.stringify({
                    amount: amount,
                    categoryid: categoryId,
                    type: type,
                    date: date,
                    time: time,
                    payee: payee,
                    note: note
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then(() => {
                onComplete();
                setLoading(false)
                toast.success("Category has been created successfully.")
                reset()
                onClose()
            })
    }

    function updateTransaction(id) {
        setLoading(true)

        fetch(`https://expense-tracker-service.vercel.app/transaction/${id}`,
            {
                method: "PUT",
                body: JSON.stringify({
                    amount: amount,
                    categoryid: categoryId,
                    type: type,
                    time: time,
                    date: date,
                    payee: payee,
                    note: note
                }),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }
        )
            .then(() => {
                onComplete();
                setLoading(false);
                toast.success("Successfully updated.");
                reset()
                onClose()
            })
    }

    function onClose() {
        router.push(`?`)
    }
    return (
        <Dialog open={open}>
            <DialogContent onClose={() => router.push(`?`)}>
                <DialogHeader>
                    <DialogTitle>Add New Record</DialogTitle>
                    <hr />
                    <DialogDescription className="grid grid-cols-2 gap-12">
                        <div className="flex flex-col gap-4">
                            <RadioGroup value={type} onValueChange={(val) => setType(val)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="EXPENSE" id="option-one" />
                                    <Label htmlFor="option-one">Expense</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="INCOME" id="option-two" />
                                    <Label htmlFor="option-two">Income</Label>
                                </div>
                            </RadioGroup>
                            <div>
                                <p className="text-left">Amount</p>
                                <Input className="" placeholder="$000.00" disabled={loading} value={amount}
                                    onChange={(event) => { setAmount(event.target.value) }} />
                            </div>
                            <div>
                                Category
                                <Select onValueChange={(val) => setCategoryId(val)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Find or choose category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <p>Date</p>
                                    <Input className="" type="date" disabled={loading} value={date}
                                        onChange={(event) => { setDate(event.target.value) }} />
                                </div>
                                <div>
                                    <p>Time</p>
                                    <Input className="" type="time" disabled={loading} value={time}
                                        onChange={(event) => { setTime(event.target.value) }} />
                                </div>
                            </div>
                            {editingId ? (
                                <Button className="w-full rounded-full" onClick={()=> updateTransaction(editingId)} disabled={loading}>
                                    Update record
                                </Button>
                            ) : (
                                <Button className="w-full rounded-full" onClick={()=> createNewTransaction(editingId)} disabled={loading}>
                                    Add record
                                </Button>
                            )}

                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label >Payee</Label>
                                <Input placeholder="Write here" type="text" disabled={loading} value={payee}
                                    onChange={(event) => { setPayee(event.target.value) }} />
                            </div>
                            <div className=" w-full max-w-sm items-center gap-1.5 h-[100%]">
                                <Label>Note</Label>
                                <Textarea placeholder="Write here" className="h-[100%]" type="text" disabled={loading} value={note}
                                    onChange={(event) => { setNote(event.target.value) }} />
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>)
}