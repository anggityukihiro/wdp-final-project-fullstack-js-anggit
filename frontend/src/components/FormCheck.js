export default function FormCheck({
    type='Button',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                className="group w-full mx-auto flex justify-center py-2 px-4 border border-transparent text-m font-medium rounded-md text-white bg-purple-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 my-5 ml-5"            >
                {text}
            </button>
            :
            <></>
        }
        </>
    )
}