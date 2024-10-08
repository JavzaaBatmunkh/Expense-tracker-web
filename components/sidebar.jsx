import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'

export function Sidebar() {
    const router = useRouter()
    return <aside> Sidebar
        <Button onClick={() => router.push(`?create=new`)}>+Add</Button>
    </aside>
}