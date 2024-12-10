import styled from 'styled-components';
import IUser from "@/interfaces";

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  border: 3px solid #ccc;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const StyledTd = styled.td`
  padding: 0.5rem;
`;

const StyledTr = styled.tr`
  &:nth-child(2n) {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Output = ({ data }: { data: IUser[] }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>ID</StyledTh>
            <StyledTh>First Name</StyledTh>
            <StyledTh>Last Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Phone</StyledTh>
            <StyledTh>Address</StyledTh>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <StyledTr key={row.id}>
              <StyledTd>{row.id}</StyledTd>
              <StyledTd>{row.firstName}</StyledTd>
              <StyledTd>{row.lastName}</StyledTd>
              <StyledTd>{row.email}</StyledTd>
              <StyledTd>{row.phone}</StyledTd>
              <StyledTd>
                {row.address.streetAddress}, {row.address.city}, {row.address.state} {row.address.zip}
              </StyledTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Output;
