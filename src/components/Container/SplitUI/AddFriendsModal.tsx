import { Box, FormField, Button, Form, Text, Layer, Heading } from 'grommet';
import { useState } from 'react';
import { AddFormDataIType, AddFriendModalInterface, emailRegex } from '../utils';

export const AddFriendModal = ({
  toggleAddFriendModal,
  setFriendList,
  friendList
}: AddFriendModalInterface) => {
  const [valid, setValid] = useState(false);

  const handleFormSubmit = ({ value }: AddFormDataIType) => {
    console.log(value);
    const list = [...friendList];
    value['id'] = Date.now(); // This can be taken from DB
    list.push(value);
    localStorage.setItem('friendList', JSON.stringify(list));
    setFriendList(list);
    toggleAddFriendModal();
  };

  return (
    <Layer
      id="add-friend-layer"
      position="center"
      onClickOutside={toggleAddFriendModal}
      onEsc={toggleAddFriendModal}>
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Add Friend
        </Heading>
        <Box fill align="center" justify="center">
          <Box width="medium">
            <Form
              validate="change"
              onSubmit={handleFormSubmit}
              onValidate={(validationResults) => {
                setValid(validationResults.valid);
              }}>
              <FormField
                label="Name"
                name="name"
                required
                validate={[
                  { regexp: /^[a-z]/i },
                  (name) => {
                    if (name && name.length === 1) return 'must be >1 character';
                    return undefined;
                  }
                ]}
              />
              <FormField
                label="Email"
                name="email"
                required
                validate={[
                  { regexp: emailRegex },
                  (email) => {
                    if (email && email.length === 1) return 'must be a valid email';
                    return undefined;
                  }
                ]}
              />
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
                  onClick={toggleAddFriendModal}
                  color="dark-3"
                />
                <Button
                  label={<Text>{'Add'} </Text>}
                  primary
                  disabled={!valid}
                  type="submit"
                  // color="blue"
                />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </Layer>
  );
};

export default AddFriendModal;
