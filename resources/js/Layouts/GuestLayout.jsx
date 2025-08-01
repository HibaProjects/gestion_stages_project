
export default function Guest({ children }) {
    return (
        <div className='bg-img-student bg-cover bg-center ' style={{ backgroundImage: "url(/bgLoginAndRegister.png)",
        backgroundSize: 'cover',

        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
         }}>
            <div className="min-h-screen flex sm:justify-center items-center pl-28 pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
        </div>
    );
}
