import { forwardRef, useRef, useEffect } from "react"
import { TableToggleAllRowsSelectedProps } from "react-table"
import './style.css'

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }: Partial<TableToggleAllRowsSelectedProps>,ref) => {
        const defaultRef = useRef<HTMLInputElement | null>(null)
        const resolvedRef =
            (ref as React.MutableRefObject<HTMLInputElement | null>) || defaultRef

        useEffect(() => {
            if (resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate as boolean
            }
        }, [resolvedRef, indeterminate])

        return <input className="checkbox" type='checkbox' ref={resolvedRef} {...rest} />
 
    }
)
export default IndeterminateCheckbox