export const FooterContainer = () => {
    return (
        <div className="bg-black">
            <Body />
            <Footer />
        </div>
    )
}

const Body = () => {
  return (
    <div>
      <section className="h-[70vh] bg-black text-4xl font-serif font-semibold text-white text-center pt-30">This is an example of a sticky footer made with css</section>
      <section className="h-[70vh] bg-black text-4xl font-serif font-semibold text-white text-center pt-96">This is an example of a sticky footer made with css</section>
    </div>
  )
}

const Footer = () => {
    return (

        // ALTERNATE IMPLEMENTATION
        // <div className="bg-black">
        //   <Body />
        //   <div className="relative h-[450px]"
        //     style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        //   >
        //     <div className="fixed bottom-0 h-[450px] w-full">
        //       <Footer />
        //     </div>
        //   </div>
        // </div>
        // ALTERNATE IMPLEMENTATION

        <div className="relative h-[450px]"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className="relative h-[calc(100vh+450px)] -top-[100vh]">
                <div className="sticky top-[calc(100vh-450px)] h-[450px]">
                    <FooterContent />
                </div>
            </div>
        </div>
    )
}

const FooterContent = () => {
    return (
        <footer className="flex flex-col justify-between bg-gray-600 p-10 h-full">
            <div className="flex gap-x-10">
                <div>
                    <div className="text-gray-400 mb-3">ABOUT</div>
                    <nav className="flex flex-col gap-y-1 text-white">
                        <a>Home</a>
                        <a>About</a>
                        <a>Contacts</a>
                        <a>Support</a>
                        <a>Careers</a>
                    </nav>
                </div>
                <div>
                    <div className="text-gray-400 mb-3">EDUCATION</div>
                    <nav className="flex flex-col gap-y-1 text-white">
                        <a>Youtube</a>
                        <a>Github</a>
                        <a>Linkedin</a>
                        <a>Facebook</a>
                        <a>Twitter</a>
                    </nav>
                </div>
            </div>

            <div className="text-9xl text-white font-serif">
                Sticky Footer
            </div>
        </footer>
    )
}
