import Footer from "@/components/footer"
import { Outlet } from "react-router-dom"


const HomeLayout = () => {

    // window.addEventListener('scroll', x => console.log(window.pageYOffset))

    return (
        <div className="flex flex-col">
            <div className="flex flex-col min-h-[calc(100vh-4rem-1px)]">
                <main className="flex flex-1 flex-col h-full"><Outlet></Outlet></main>
                <Footer />
            </div>
        </div>
    )
}

export default HomeLayout







