import {useState,useEffect} from 'react'
import results from './data/Result'
import {
    Container,
    Table,
    Button,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";
  import moment from "moment";
  import "bootstrap/dist/css/bootstrap.css";

const TaskComplete = () => {
    const [data, setData] = useState(results)
    const [filterChannel,setFilterChannel] = useState()
    const [sortOrder, setSortOrder] = useState()


    useEffect(()=>{
        const ValidDate = results.map((item)=>{
            const currentDate = moment().format("YYYY-MM-DD")
            return{
                ...item,
                modifiedAt: moment(item.modifiedAt).isAfter(currentDate)? currentDate: item.modifiedAt
            }
        })
        setData(ValidDate)
    },[])



    const getFilteredData = () => {
        let filteredData = [...data];
        if (filterChannel) {
          filteredData = filteredData.filter(
            (item) => item.channel === filterChannel
          );
        }
        if (sortOrder) {
          filteredData.sort((a, b) =>
            sortOrder === "asc"
              ? a.channel.localeCompare(b.channel)
              : b.channel.localeCompare(a.channel)
          );
        }
        return filteredData;
      };

const handleFilterChannel = (e)=>{
    setFilterChannel(e.target.value)
}

const handleSortChange = (e)=>{
    setSortOrder(e.target.value)

}

    const handleReset =()=>{
        setFilterChannel("")
        setSortOrder("")
        setData(results)
    }

  return (
    <div>
        <h2>Output:</h2>
        <br/>
        <Container>
            <FormGroup>
                <Label for="filterChannel"> Filter By Channel</Label>
                <Input
                type='select'
                name = 'filterChannel'
                id='filterChannel'
                value={filterChannel}
                onChange={handleFilterChannel}
                >
                    <option value="">Select Channel</option>
                    {Array.from(new Set(data.map((item)=>item.channel)
                )).map((channel)=>(
                    <option key={channel} value={channel}>{channel}</option>
                ))}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="sortOrder">Sort By channel</Label>
                <Input
                type='select'
                name='sortOrder'
                id='sortOrder'
                value={sortOrder}
                onChange={handleSortChange}
                >
                    <option value="">None</option>
                    <option value="asc">Ascending</option>
                    <option value="des">Descending</option>

                </Input>
            </FormGroup>

            <Button color="primary" onClick={handleReset} >
                Reset Data
            </Button>
        <br />
        <Table striped>
            <thead>
                <tr>
                    <th>Topic </th>
                    <th>Modified Date</th>
                    <th>Title</th>
                    <th>Channel</th>
                    <th>Views Count</th>
                    <th>Winner</th>
                </tr>
            </thead>
            <tbody>
                {getFilteredData().map((item, index)=>(
                    <tr key= {index}>
                        <td>{item.topic}</td>
                        <td>{moment(item.modifiedAt).format("YYYY-MM-DD")}</td>
                        <td>{item.title}</td>
                        <td>{item.channel}</td>
                        <td>{item.viewsCount}</td>
                        <td>{item.viewsCount >10 ? "Winner":"Loser"}</td>
                    </tr>
                ))}
            </tbody>

        </Table>

        </Container>
    </div>
  )
}

export default TaskComplete