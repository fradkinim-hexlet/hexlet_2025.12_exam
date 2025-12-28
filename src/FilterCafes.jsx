export default function CafeFilter({ onSelectionChange }) {
    const stationList = [
        { displayName: "Арбатская", value: "Arbat" },
        { displayName: "Александровский сад", value: "Alexanders Garden" },
        { displayName: "Московская", value: "Moscow" },
        { displayName: "Парк Культуры", value: "Culture" },
        { displayName: "Театральная", value: "Theatr" }
    ];

    const selectionChanged = (event) => {
        onSelectionChange(event.target.value);
    };

    return (
        <div className="controls">
            <select name="subway" id="subway" onChange={selectionChanged}>
                <option value="All" selected>Все</option>
                {stationList.map(station => (
                    <option key={station.value} value={station.value}>
                        {station.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
}