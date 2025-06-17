import React from 'react';


type SideBarProps = {
    activeMenu: number;
}

const SideBar: React.FC<SideBarProps> = ({ activeMenu }) => {
    const menus = [["Home", "home"], ["History", "history"], ["Add workout", "workout"], ["Settings", "settings"]];

    return(
        <div className='flex flex-col w-[20vw] bg-white/10 min-h-screen'>
            {menus.map((item, index) => {
                let style: string[] = ['text-center', 'text-white', 'w-min-full', 'py-[5vw]', 'px-8'];
                if (index === activeMenu) {
                    style.push('font-bold')
                    style.push('text-[28px]')
                } 
                else {
                    style.push('text-[20px]')
                }

                return (
                    <button key={index} className={style.join(' ')}>
                        <a href={item[1].toLowerCase().replace(' ', '')}>{item[0]}</a>
                    </button>
                )
            }
            )}
        </div>
    )
}


export default SideBar;