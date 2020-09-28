import React, {useState} from "react";
import style from "./Paginator.module.css";

type PropsType = {
    pageSize : number
    totalItemsCount : number
    currentPage : number
    onPageChanged : (page: number) => void
    portionSize? : number
}

const Paginator: React.FC<PropsType> = ({pageSize, totalItemsCount, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(totalItemsCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPageNumberPortion = (portionNumber * portionSize) - (portionSize - 1);
    const rightPageNumberPortion = portionNumber * portionSize;


    return (
        <div className={style.pages__number}>
            {
                portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)} >PREV</button>
            }

            {
                pages.filter(page => page >= leftPageNumberPortion && page <= rightPageNumberPortion)
                    .map(page =>
                        <span className={currentPage === page ? style.selectedPage : '' }
                              onClick={(e) => onPageChanged(page)}>
                        {`${page} `}
                        </span>)

            }

            {
                portionNumber < portionCount &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            }
            {/*{pages.map(page => <span className={currentPage === page && style.selectedPage}*/}
            {/*                         onClick={(e) => onPageChanged(page)}>*/}
            {/*        {`${page} `}*/}
            {/*    </span>)}*/}
        </div>
    )

}

export default Paginator;