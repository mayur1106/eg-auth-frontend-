import {navigation} from '../../config/constatnts'
import {  Link } from "react-router-dom";

const Nav = (props:any) => {

    return ( props.isMobile ?  <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link 
                    key={item.key}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      target={item.target}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
               
              </div>
            </div> : <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
                <Link 
                      to={item.href}
                      key={item.key}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      target={item.target}
                    >
                      {item.name}
                    </Link>
            ))}
          </div>)
}

export default Nav;