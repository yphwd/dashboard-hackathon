import { TableRow } from "./TableRow";

export const Table = (props) => {
    const { data } = props;


    const createRows = (data) => {
        const rows_names = [];

        for (let i = 0; i < data.length; i++) {
            const cur = data[i];

            for (let j = 0; j < data.length; j++) {
                if (rows_names.indexOf(cur.y) < 0) {
                    rows_names.push(cur.y)
                }
            }
        }

        const rows_objects = []

        for (let i = 0; i < data.length; i++) {
            const cur = data[i];

            if (!rows_objects[cur.y]) {
                rows_objects[cur.y] = []
            }

            const obj = {
                x: data[i].x,
                value: data[i].value,
            }

            rows_objects[cur.y].push(obj)
        }



        const rows = rows_names.map(name => {
            const row = rows_objects[name]

            return <TableRow key={name} row={row} name={name} />
        })

        return { rows, rows_names };
    }

    const { rows, rows_names } = createRows(data)

    const createAxisX = () => {

        const cells = rows_names.map(name => <div key={name} className="font-bold w-[70px] h-[150px] mt-[90px] rotate-[-45deg]">{name}</div>)

        return (
            <div className="flex flex-row">
                <div className="w-[100px]" />
                {cells}
            </div>
        )
    }
    const axisX = createAxisX();
    rows.push(axisX)

    return (<div className="flex flex-col m-2">
        {rows}
        <div className="m-8 font-bold text-red-500">
            {data === undefined || data.length === 0 && `Для отображения карты выберите параметры  и нажмите "Сформировать карту"`}
        </div>
    </div>)
}