import SideBar from '@/components/SideBar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: HomePage,
})

export function HomePage() {
  return (
    <div className='flex min-h-screen bg-gradient-to-b from-[#862121] to-[#17132F]'>
      <SideBar activeMenu={0}/>
    </div>
  )
}