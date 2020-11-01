import React from "react"
import clsx from "clsx"
import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useFormContext, Controller } from "react-hook-form"

const useStyles = makeStyles(theme => ({
    select: {
        minWidth: 120
    }
}))

function Select({ label, name, options, className }) {
    const classes = useStyles()
    
    const { control } = useFormContext()

    return (
        <FormControl className={clsx(className, classes.select)}>
            <InputLabel>{ label }</InputLabel>

            <Controller
                name={name}
                control={control}
                as={(
                    <MuiSelect>
                        { options.map(({ name, value }) => (
                            <MenuItem value={value} key={value}>
                                { name}
                            </MenuItem>
                        ))}
                    </MuiSelect>
                )}
            />
        </FormControl>
    )
}

export default Select