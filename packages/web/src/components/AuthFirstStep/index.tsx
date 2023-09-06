import { Box, Button, FormHelperText, Typography } from '@mui/material'
import AuthTableFields from 'components/AuthFieldsTable'
import AuthNewField from 'components/AuthNewField'
import CustomAccordion from 'components/CustomAccordion'
import TagNumber from 'components/TagNumber'
import WrappingBox from 'components/WrappingBox'
import { useState } from 'react'
import type { AuthFirstStepProps, NewIntegrationAuthAPIKeyFormValues, field } from '@automatisch/types'
import { useFieldArray } from 'react-hook-form'


function AuthFirstStep({register,  watch, control}:AuthFirstStepProps) {

    const {fields, remove, append} = useFieldArray<NewIntegrationAuthAPIKeyFormValues>({name: 'fields', control});


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        append({key: "", label: "", type: "", description: "", readOnly: false, required: true, canCopy: false});
    };

    const handleClose = () => {
        setOpen(false);
    };

    function removeField(index:number) {
        remove(index);
    }

    return (
        <>
            <AuthNewField formUtilities={{register, watch, control}} handleClose={handleClose} removeField={removeField} openModal={open} />
            <CustomAccordion tag={<TagNumber text="Step 1" />} heading="Configure your fields">
                <WrappingBox>
                    <Typography sx={{ fontSize: '1rem', display: 'inline-block' }} >Authentication Fields <Typography sx={{ fontSize: '10px', color: 'red', fontWeight: '600', display: 'inline-block' }}>{'(required)'}</Typography></Typography>

                    <FormHelperText focused>
                        <Typography sx={{ fontSize: '0.8rem' }}>
                            Build a form with fields for each item your API requires for authentication, including a field for your API key and additional field for any other data needed. Zapier does not include any fields by default.
                        </Typography> <br />

                        <Typography sx={{ fontWeight: '600', fontSize: '0.9rem' }}>
                            You must define at least one field where your users can enter API credentials. Your authentication configuration is not complete
                        </Typography>
                    </FormHelperText>
                </WrappingBox>

                <AuthTableFields rows={fields} />

                <Box sx={{ mt: '1rem', display: 'flex', gap: '1rem' }}>
                    <Button type="button" size="small" variant="outlined" onClick={handleClickOpen}>Add Fields</Button>
                    <Button type="button" size="small" variant="contained">Continue</Button>
                </Box>
            </CustomAccordion>
        </>
    )
}

export default AuthFirstStep