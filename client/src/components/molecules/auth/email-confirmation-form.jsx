import React from "react";
import Button from "../../atoms/button";
import Input from "../../atoms/input";

function EmailConfirmationForm() {
  return (
    <form className="grid grid-cols-2 gap-x-2 gap-y-4">
      <div className="col-span-2">
        <Input
          type="text"
          placeholder="confirmation code"
          name="email"
          color="gray"
        />
      </div>
      <div className="submit col-span-2">
        <Button color="primary" size="medium" style="filled" className="w-full">
          Confirm
        </Button>
      </div>
    </form>
  );
}

export default EmailConfirmationForm;
