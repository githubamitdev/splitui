/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Avatar, Nav, Header, Text, Footer } from 'grommet';
import { Add } from 'grommet-icons/icons';
import { Fragment } from 'react';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface FuncInterface {
  (): void;
}

export type FriendListType = {
  [id: string]: number | string;
  name: string;
  email: string;
};

export type AddFormDataIType = {
  value: FriendListType;
};

export interface AddFriendModalInterface {
  toggleAddFriendModal: FuncInterface;
  setFriendList: React.Dispatch<React.SetStateAction<any[]>>;
  friendList: Array<FriendListType>;
}

export interface AddExpensesModalInterface {
  toggleAddExpensesModal: FuncInterface;
}

export const currentUserInfoObj = { name: 'you', email: '', id: '' };

export const defaultSplitOptn = { name: 'equally', value: 'equally' };

export const getSplitOptions = (selectedFriends: Array<FriendListType>) => {
  const optionsArr = [defaultSplitOptn, { name: 'unequally(WIP)', disabled: true }];
  if (selectedFriends.length === 1) {
    optionsArr.push({ name: 'owes full', value: 'full' });
  }
  return optionsArr;
};

export const renderMainSection = ({ friendList, toggleAddFriendModal }: any) => {
  return (
    <>
      <Header background="light" pad="small" gap="small">
        <Box direction="row">
          <Text size="xxlarge" weight={'normal'}>
            Friends
          </Text>
        </Box>
        <Nav direction="row">
          <Button label="Add Friend" onClick={toggleAddFriendModal} />
        </Nav>
      </Header>
      <Header background="light-4" pad={'small'}>
        <Box direction="row">
          <Box direction="column">
            <Avatar background="blue" />
          </Box>
          <Box direction="column" pad={{ top: 'xxsmall', left: 'small' }}>
            <Box direction="row">
              <Text weight={'bold'}>Total Balance</Text>
            </Box>
            <Box direction="row">
              <Text>{calculateCurrentUserExpenses()}</Text>
            </Box>
          </Box>
        </Box>
      </Header>
      <Box pad="medium">
        {friendList?.map((friendList: any) => {
          return (
            <Fragment key={friendList.name}>
              <Header background="white" pad="small">
                <Box direction="row">
                  <Box direction="column">
                    <Avatar background="gray">{friendList.name.slice(0, 2).toUpperCase()}</Avatar>
                  </Box>
                  <Box direction="column" pad={{ top: 'small', left: 'small' }}>
                    <Text>{friendList.name}</Text>
                  </Box>
                  <Box direction="column" pad={{ top: 'small', left: 'small' }}>
                    <Text>{calculateUserExpenses(friendList.id)}</Text>
                  </Box>
                </Box>
              </Header>
              <hr style={{ borderTop: '1px solid red' }} />
            </Fragment>
          );
        })}
      </Box>
    </>
  );
};

export const renderAppFooter = ({ toggleAddExpensesModal }: AddExpensesModalInterface) => {
  return (
    <Box flex={false}>
      <Footer background="gray" justify="center" pad="medium">
        <Button alignSelf="center">
          <Box
            border="all"
            background={'green'}
            color="black"
            width={'xxsmall'}
            height={'xxsmall'}
            justify="center"
            fill
            align="center">
            <Add size="medium" color="white" onClick={toggleAddExpensesModal} />
          </Box>
        </Button>
      </Footer>
    </Box>
  );
};

export const calculateCurrentUserExpenses = () => {
  let existingData = [];
  if (localStorage.getItem('expenseData')) {
    const storageData: any = localStorage.getItem('expenseData');
    existingData = JSON.parse(storageData);
  }
  let totalPaid = 0;
  let totalLent = 0;
  existingData.filter((obj: any) => {
    if (!(obj.paidBy === '' && obj.id === '')) {
      if (obj.paidBy === '' && obj.id != '') {
        totalPaid = obj.amount + totalPaid;
      } else if (obj.PaidBy != '' && obj.id === '') {
        totalLent = obj.amount + totalLent;
      }
    }
  });
  if (totalPaid === totalLent) {
    return `You are settled`;
  }
  if (totalPaid > totalLent) {
    const label = `You are owed ${String.fromCharCode(8377)} ${Math.floor(totalPaid - totalLent)}`;
    return (
      <Text weight={'bold'} color={'olive'}>
        {label}
      </Text>
    );
  }
  if (totalPaid < totalLent) {
    const label = `You owe ${String.fromCharCode(8377)} ${Math.floor(totalLent - totalPaid)}`;
    return (
      <Text weight={'bold'} color={'red'}>
        {label}
      </Text>
    );
  }
};

export const calculateUserExpenses = (id = '') => {
  let existingData = [];
  if (localStorage.getItem('expenseData')) {
    const storageData: any = localStorage.getItem('expenseData');
    existingData = JSON.parse(storageData);
  }
  let totalPaid = 0;
  let totalLent = 0;
  existingData.filter((obj: any) => {
    if (!(obj.paidBy === id && obj.id === id)) {
      if (obj.paidBy === id && obj.id !== id) {
        totalPaid = totalPaid + obj.amount;
      } else if (obj.id === id && obj.paidBy !== id) {
        totalLent = totalLent + obj.amount;
      }
    }
  });

  if (totalPaid === totalLent) {
    return `settled up`;
  }
  if (totalPaid > totalLent) {
    const label = `you owe ${String.fromCharCode(8377)} ${Math.floor(totalPaid - totalLent)}`;
    return (
      <Text weight={'bold'} color={'red'}>
        {label}
      </Text>
    );
  }
  if (totalPaid < totalLent) {
    const label = `owes you ${String.fromCharCode(8377)} ${Math.floor(totalLent - totalPaid)}`;
    return (
      <Text weight={'bold'} color={'green'}>
        {label}
      </Text>
    );
  }
};

export const handleExpenseFormOprtn = (value: any) => {
  let amount = 0;
  const expensesArray: any = [];
  if (value.splitAmount.value === 'equally') {
    amount = Math.floor(value.amount / (value.friends.length + 1));
    [...value.friends, currentUserInfoObj].forEach((val) => {
      expensesArray.push({ ...val, amount: amount, paidBy: value.paidBy.id });
    });
  } else if (value.splitAmount.value === 'full') {
    amount = Math.floor(value.amount);
    [...value.friends, currentUserInfoObj].forEach((val) => {
      expensesArray.push({ ...val, amount: amount, paidBy: value.paidBy.id });
    });
  }
  return expensesArray;
};

export const searchArr = (searchText: string, arr: any, key: string) => {
  const escapedText = searchText.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  const exp = new RegExp(escapedText, 'i');
  return arr.filter((o: any) => exp.test(o?.[key]));
};

export const setExpenseData = (expensesArr: any) => {
  let existingData = [];
  if (localStorage.getItem('expenseData')) {
    const storageData: any = localStorage.getItem('expenseData');
    existingData = JSON.parse(storageData);
  }
  console.log(expensesArr);

  const newData: any = [...existingData, ...expensesArr];
  localStorage.setItem('expenseData', JSON.stringify(newData));
};
