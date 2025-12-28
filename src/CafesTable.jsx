import { useState, useEffect } from "react";
import FilterCafes from "./FilterCafes";

export default function CafeListing() {
    const [dataList, setDataList] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");

    const fetchData = () => {
        fetch('/cafes')
            .then(response => response.json())
            .then(result => {
                setDataList(result.cafes);
                setVisibleItems(result.cafes);
            })
            .catch(error => {
                console.log('Загрузка данных не удалась', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const updateList = () => {
            if (activeFilter === "All") {
                setVisibleItems(dataList);
            } else {
                const filtered = dataList.filter(item => item.subwayCode === activeFilter);
                setVisibleItems(filtered);
            }
        };
        updateList();
    }, [activeFilter, dataList]);

    const updateFilterValue = (filterValue) => {
        setActiveFilter(filterValue);
    };

    const getImageSource = (image) => {
        return image || "https://via.placeholder.com/150";
    };

    return (
        <div id="container" className="container m-3">
            <div className="cafesTable">
                <FilterCafes onSelectionChange={updateFilterValue} />
                <ul className="cardsList">
                    {visibleItems.map(place => (
                        <li className="card" key={place.id}>
                            <img src={getImageSource(place.img)} alt="" />
                            <h2>{place.name}</h2>
                            <p>{place.desc}</p>
                            <p>{place.address}</p>
                            <p>Subway: {place.subwayCode}</p>
                            <p>{place.workTime}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}