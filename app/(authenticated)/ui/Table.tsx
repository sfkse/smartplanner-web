import styled from "styled-components";
import Button from "@/app/(authenticated)/ui/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type ChildrenProps = {
  children: React.ReactNode;
};

type TableHeadProps = {
  headerElements: string[];
};

type TableDataProps = {
  tableData: string[] | any[];
};

type ActionProps = {
  actionButtons: {
    text: string;
    icon: React.ReactNode;
    color?: "primary" | "error";
    callback: () => void;
  }[];
};

function Table({ children }: ChildrenProps) {
  return <TableWrapper>{children}</TableWrapper>;
}

function TableHeader({ children }: ChildrenProps) {
  return <Header>{children}</Header>;
}

function TableHeaderRow({ children }: ChildrenProps) {
  return <Row>{children}</Row>;
}

function TableHead({ headerElements }: TableHeadProps) {
  return (
    <>
      {headerElements.map((item) => (
        <Head key={item}>{item}</Head>
      ))}
    </>
  );
}

function TableBody({ children }: ChildrenProps) {
  return <Body>{children}</Body>;
}

function TableBodyRow({ tableData }: TableDataProps) {
  return (
    <>
      {tableData.map((item, rowIndex) => (
        <Row key={rowIndex}>
          {Array.from(Object.keys(item)).map((key, colIndex) => (
            <>
              {Object.keys(item).length - 1 === colIndex ? (
                <TableDataAction
                  key={`${rowIndex}-${colIndex}`}
                  actionButtons={item[key]}
                />
              ) : (
                <TableData key={`${rowIndex}-${colIndex}`}>
                  {item[key]}
                </TableData>
              )}
            </>
          ))}
        </Row>
      ))}
    </>
  );
}

function TableData({ children }: ChildrenProps) {
  return <Data>{children}</Data>;
}

function TableDataAction({ actionButtons }: ActionProps) {
  return (
    <Action>
      {actionButtons.map((button, index) => (
        <Button
          key={index}
          text={button.text}
          startIcon={button.icon}
          color={button.color}
          handleClick={button.callback}
        />
      ))}
    </Action>
  );
}

Table.Header = TableHeader;
Table.TableHeaderRow = TableHeaderRow;
Table.Head = TableHead;
Table.Body = TableBody;
Table.TableBodyRow = TableBodyRow;
Table.Data = TableData;
Table.DataAction = TableDataAction;

export default Table;

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Header = styled.thead`
  background-color: var(--primary-light-transparent);
`;

const Row = styled.tr`
  border-bottom: 1px solid var(--primary-light-transparent);
`;

const Head = styled.th`
  padding: 1rem;
  text-align: left;
`;

const Body = styled.tbody``;

const Data = styled.td`
  padding: 1rem;
`;

const Action = styled.td`
  padding: 1rem;
  display: flex;
  gap: 5px;
`;

