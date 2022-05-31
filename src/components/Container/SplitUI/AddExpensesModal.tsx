/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, FormField, Button, Form, Text, Select, Layer, Heading } from 'grommet';
import { useEffect, useState } from 'react';
import {
  AddExpensesModalInterface,
  currentUserInfoObj,
  defaultSplitOptn,
  getSplitOptions,
  handleExpenseFormOprtn,
  searchArr,
  setExpenseData
} from '../utils';
import { Tasks, Currency } from 'grommet-icons';
import { KVPair } from '../../../utils/types';

export const AddExpensesModal = ({ toggleAddExpensesModal }: AddExpensesModalInterface) => {
  const localStorageList = localStorage.getItem('friendList');
  const [friendList] = useState<Array<KVPair>>(JSON.parse(localStorageList as string) || []);
  const [validAddExpense, setValidAddExpense] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedSplitOption, setSelectedSplitOption] = useState(defaultSplitOptn);
  const [friendListOptns, setFriendListOptns] = useState<Array<KVPair>>(
    JSON.parse(localStorageList as string) || []
  );
  const [paidBy, setPaidBy] = useState(currentUserInfoObj);

  useEffect(() => {
    return () => {
      setSelectedFriends([]);
      setPaidBy(currentUserInfoObj);
    };
  }, []);

  const getPaidByFriendsOptns = () => {
    return selectedFriends.length ? [...selectedFriends, currentUserInfoObj] : [currentUserInfoObj];
  };

  const handleExpenseFormSubmit = ({ value }: any) => {
    setExpenseData(handleExpenseFormOprtn(value));
    toggleAddExpensesModal();
  };

  const handleSearch = (searchText: string) => {
    const updatedList = searchArr(searchText, friendList, 'name');
    setFriendListOptns(updatedList);
  };

  const handleSelectClose = () => {
    setFriendListOptns(friendList);
  };

  const handleExpenseChange = (val: KVPair) => {
    if (val.friends) {
      setSelectedFriends(val.friends as any);
    }
    if (val.splitAmount) {
      setSelectedSplitOption(val.splitAmount as any);
    }
    if (val.paidBy) {
      setPaidBy(val.paidBy as any);
    }
  };

  return (
    <Layer
      id="hello world"
      position="center"
      onClickOutside={toggleAddExpensesModal}
      onEsc={toggleAddExpensesModal}
      // full={'vertical'}
    >
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Add an expense
        </Heading>
        <Box fill align="center" justify="center">
          <Box width={'medium'}>
            Split With You and
            <Form
              validate="change"
              onSubmit={handleExpenseFormSubmit}
              onChange={handleExpenseChange}
              onValidate={(validationResults) => {
                // console.log('validationResults = ', validationResults);
                setValidAddExpense(validationResults.valid);
              }}>
              <FormField>
                <Select
                  required
                  name="friends"
                  searchPlaceholder="Enter to search"
                  placeholder="Select your friend(s)"
                  onClose={handleSelectClose}
                  size="small"
                  onSearch={handleSearch}
                  multiple
                  options={friendListOptns}
                  labelKey="name"
                  valueKey={'id'}
                />
              </FormField>

              <FormField
                label={<Tasks />}
                name="description"
                placeholder="Enter a description"
                validate={[
                  { regexp: /^[a-z]/i },
                  (name) => {
                    if (!name) return 'Description is required';
                    return undefined;
                  },
                  (name) => {
                    if (name && name.length === 1) return 'must be >1 character';
                    return undefined;
                  }
                ]}
              />

              <FormField
                label={<Currency />}
                name="amount"
                placeholder={'0.00'}
                type="number"
                validate={[
                  (amount) => {
                    if (!amount) return 'Amount is required';
                    return undefined;
                  }
                ]}
              />
              <Box direction="row" align="center" gap="small" pad={{ top: 'small' }}>
                <Text size="xsmall">Paid By</Text>
                <Select
                  name="paidBy"
                  size="xsmall"
                  placeholder="You"
                  options={getPaidByFriendsOptns()}
                  labelKey="name"
                  valueKey={'id'}
                  value={paidBy}
                />
                <Text size="xsmall">and split</Text>
                <Select
                  name="splitAmount"
                  size="xsmall"
                  placeholder="equally"
                  disabled={!selectedFriends.length}
                  options={getSplitOptions(selectedFriends)}
                  labelKey="name"
                  valueKey="value"
                  value={selectedSplitOption}
                  disabledKey={'disabled'}
                />
              </Box>
              <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: 'medium', bottom: 'small' }}>
                <Button
                  type="button"
                  label="Cancel"
                  onClick={toggleAddExpensesModal}
                  color="dark-3"
                />
                <Button
                  label={<Text>{'Save'} </Text>}
                  primary
                  disabled={!validAddExpense}
                  type="submit"
                />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </Layer>
  );
};

export default AddExpensesModal;
