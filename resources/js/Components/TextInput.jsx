import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '',value='', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            ref={input}
            type={type}
            value={value ?? ''} // Handle null value
            className={
                'border-gray-300 border focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }


        />
    );
});
