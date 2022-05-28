import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10 pt-20">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className="h-14"
                    src="https://loket-asset-production.s3.ap-southeast-1.amazonaws.com/lp/sdk/prod/uploads/7/logo-pk-black.png"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-red-600 hover:text-orange-500">
                {linkName}
            </Link>
            </p>
        </div>
    )
}