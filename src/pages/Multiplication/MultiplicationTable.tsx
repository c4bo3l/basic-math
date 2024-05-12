import { CloseOutlined } from "@ant-design/icons";
import { Flex, Table, TableProps } from "antd";

interface DataType {
  num1: number;
  num2: number;
  value: number;
}

const MultiplicationTable = () => {
  const maxNumber = 10;
  const arr = Array.from(Array(maxNumber).keys()).map((x) => x + 1);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "num1",
      dataIndex: "num1",
      key: "num1",
    },
    {
      title: "x",
      key: "x",
      render: () => <CloseOutlined />,
    },
    {
      title: "num2",
      dataIndex: "num2",
      key: "num2",
    },
    {
      title: "eq",
      key: "eq",
      render: () => "=",
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const getRows = (num: number) => {
    return arr.map(
      (x): DataType => ({
        num1: num,
        num2: x,
        value: num * x,
      })
    );
  };

  return (
    <>
      <Flex wrap gap="18px">
        {arr.map((x) => (
          <Table
            key={`table-${x}`}
            columns={columns}
            dataSource={getRows(x)}
            showHeader={false}
            pagination={{
              hideOnSinglePage: true
            }}
          />
        ))}
      </Flex>
    </>
  );
};

export default MultiplicationTable;
