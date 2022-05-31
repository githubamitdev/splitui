/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Main } from 'grommet';
import { renderAppFooter, renderMainSection } from '../utils';
import AddExpensesModal from './AddExpensesModal';
import AddFriendModal from './AddFriendsModal';

export const UI = () => {
  const [openAddFriendModal, setOpenAddFriendModal] = useState(false);
  const [openAddExpensesModal, setOpenAddExpensesModal] = useState(false);
  const localStorageList = localStorage.getItem('friendList');

  const [friendList, setFriendList] = useState<Array<any>>(
    JSON.parse(localStorageList as any) || []
  );

  const toggleAddFriendModal = () => {
    setOpenAddFriendModal(!openAddFriendModal);
  };
  const toggleAddExpensesModal = () => {
    setOpenAddExpensesModal(!openAddExpensesModal);
  };

  return (
    <Box fill>
      <Box flex overflow={'auto'}>
        <Main background="white" elevation="medium" pad="xsmall" gap="small">
          {renderMainSection({ friendList, toggleAddFriendModal })}
          {openAddFriendModal && (
            <AddFriendModal
              toggleAddFriendModal={toggleAddFriendModal}
              friendList={friendList}
              setFriendList={setFriendList}
            />
          )}
          {openAddExpensesModal && (
            <AddExpensesModal toggleAddExpensesModal={toggleAddExpensesModal} />
          )}
        </Main>
      </Box>
      {renderAppFooter({ toggleAddExpensesModal })}
    </Box>
  );
};
export default UI;
