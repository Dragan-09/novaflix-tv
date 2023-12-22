(function (React, designSystem) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  function Credentials(props) {
    React.useState(null);
    React.useState(null);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      flex: true
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "white",
      width: 1,
      boxShadow: "card",
      mr: "xxl",
      flexShrink: 0
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H4, null, "Send Credentials."), /*#__PURE__*/React__default.default.createElement("form", {
      action: ""
    }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Username"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      placeholder: "IP Tv - Account Username"
      // onChange={(e) => setUsername(e.target.value)}
    })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
      required: true
    }, "Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
      placeholder: "IP Tv - Account Password"
      // onChange={(e) => setPassword(e.target.value)}
    })), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      variant: "contained",
      color: "primary",
      size: "lg"
      // onClick={sendCredentials}
    }, "Send"))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null));
  }

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Credentials = Credentials;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9jcmVkZW50aWFscy5qc3giLCIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgQm94LFxyXG4gIEg0LFxyXG4gIEZvcm1Hcm91cCxcclxuICBMYWJlbCxcclxuICBJbnB1dCxcclxuICBCdXR0b24sXHJcbn0gZnJvbSBcIkBhZG1pbmpzL2Rlc2lnbi1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgQWN0aW9uUHJvcHMgfSBmcm9tIFwiYWRtaW5qc1wiO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5mdW5jdGlvbiBDcmVkZW50aWFscyhwcm9wcykge1xyXG4gIGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcclxuICBjb25zdCBbdXNlcm5hbWUsIHNldFVzZXJuYW1lXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIGNvbnN0IHNlbmRDcmVkZW50aWFscyA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IHNlbmQgPSBhd2FpdCBheGlvcy5wb3N0KFxyXG4gICAgICBgJHtwcm9jZXNzLmVudi5CQUNLRU5EX1VSTH0vYXBpL3BsYW4vYWN0aXZlLyR7cmVjb3JkLnBhcmFtcy51c2VyfS8ke3JlY29yZC5wYXJhbXMuaWR9L2BcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggZmxleD5cclxuICAgICAgPEJveCB2YXJpYW50PVwid2hpdGVcIiB3aWR0aD17MX0gYm94U2hhZG93PVwiY2FyZFwiIG1yPVwieHhsXCIgZmxleFNocmluaz17MH0+XHJcbiAgICAgICAgPEg0PlNlbmQgQ3JlZGVudGlhbHMuPC9IND5cclxuICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIj5cclxuICAgICAgICAgIDxGb3JtR3JvdXA+XHJcbiAgICAgICAgICAgIDxMYWJlbCByZXF1aXJlZD5Vc2VybmFtZTwvTGFiZWw+XHJcbiAgICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSVAgVHYgLSBBY2NvdW50IFVzZXJuYW1lXCJcclxuICAgICAgICAgICAgICAvLyBvbkNoYW5nZT17KGUpID0+IHNldFVzZXJuYW1lKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxyXG4gICAgICAgICAgPEZvcm1Hcm91cD5cclxuICAgICAgICAgICAgPExhYmVsIHJlcXVpcmVkPlBhc3N3b3JkPC9MYWJlbD5cclxuICAgICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJJUCBUdiAtIEFjY291bnQgUGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgIC8vIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XHJcbiAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgIHZhcmlhbnQ9e1wiY29udGFpbmVkXCJ9XHJcbiAgICAgICAgICAgIGNvbG9yPXtcInByaW1hcnlcIn1cclxuICAgICAgICAgICAgc2l6ZT17XCJsZ1wifVxyXG4gICAgICAgICAgICAvLyBvbkNsaWNrPXtzZW5kQ3JlZGVudGlhbHN9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIFNlbmRcclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgPC9Cb3g+XHJcbiAgICAgIDxCb3g+ey8qIDxCb3ggb3ZlcmZsb3dYPVwiYXV0b1wiPntKU09OLnN0cmluZ2lmeShyZWNvcmQpfTwvQm94PiAqL308L0JveD5cclxuICAgIDwvQm94PlxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENyZWRlbnRpYWxzO1xyXG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDcmVkZW50aWFscyBmcm9tICcuLi9zcmMvYWRtaW4vY29tcG9uZW50cy9jcmVkZW50aWFscydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ3JlZGVudGlhbHMgPSBDcmVkZW50aWFscyJdLCJuYW1lcyI6WyJDcmVkZW50aWFscyIsInByb3BzIiwidXNlU3RhdGUiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJmbGV4IiwidmFyaWFudCIsIndpZHRoIiwiYm94U2hhZG93IiwibXIiLCJmbGV4U2hyaW5rIiwiSDQiLCJhY3Rpb24iLCJGb3JtR3JvdXAiLCJMYWJlbCIsInJlcXVpcmVkIiwiSW5wdXQiLCJwbGFjZWhvbGRlciIsIkJ1dHRvbiIsImNvbG9yIiwic2l6ZSIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVlBLFNBQVNBLFdBQVdBLENBQUNDLEtBQUssRUFBRTtJQUVNQyxjQUFRLENBQUMsSUFBSSxFQUFDO0lBQ2RBLGNBQVEsQ0FBQyxJQUFJLEVBQUM7RUFROUMsRUFBQSxvQkFDRUMsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFBO01BQUNDLElBQUksRUFBQSxJQUFBO0VBQUEsR0FBQSxlQUNQSCxzQkFBQSxDQUFBQyxhQUFBLENBQUNDLGdCQUFHLEVBQUE7RUFBQ0UsSUFBQUEsT0FBTyxFQUFDLE9BQU87RUFBQ0MsSUFBQUEsS0FBSyxFQUFFLENBQUU7RUFBQ0MsSUFBQUEsU0FBUyxFQUFDLE1BQU07RUFBQ0MsSUFBQUEsRUFBRSxFQUFDLEtBQUs7RUFBQ0MsSUFBQUEsVUFBVSxFQUFFLENBQUE7S0FDbkVSLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ1EsZUFBRSxFQUFDLElBQUEsRUFBQSxtQkFBcUIsQ0FBQyxlQUMxQlQsc0JBQUEsQ0FBQUMsYUFBQSxDQUFBLE1BQUEsRUFBQTtFQUFNUyxJQUFBQSxNQUFNLEVBQUMsRUFBQTtLQUNYVixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUNVLHNCQUFTLHFCQUNSWCxzQkFBQSxDQUFBQyxhQUFBLENBQUNXLGtCQUFLLEVBQUE7TUFBQ0MsUUFBUSxFQUFBLElBQUE7RUFBQSxHQUFBLEVBQUMsVUFBZSxDQUFDLGVBQ2hDYixzQkFBQSxDQUFBQyxhQUFBLENBQUNhLGtCQUFLLEVBQUE7RUFDSkMsSUFBQUEsV0FBVyxFQUFDLDBCQUFBO0VBQ1o7RUFBQSxHQUNELENBQ1EsQ0FBQyxlQUNaZixzQkFBQSxDQUFBQyxhQUFBLENBQUNVLHNCQUFTLEVBQ1JYLElBQUFBLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ1csa0JBQUssRUFBQTtNQUFDQyxRQUFRLEVBQUEsSUFBQTtFQUFBLEdBQUEsRUFBQyxVQUFlLENBQUMsZUFDaENiLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2Esa0JBQUssRUFBQTtFQUNKQyxJQUFBQSxXQUFXLEVBQUMsMEJBQUE7RUFDWjtFQUFBLEdBQ0QsQ0FDUSxDQUFDLGVBQ1pmLHNCQUFBLENBQUFDLGFBQUEsQ0FBQ2UsbUJBQU0sRUFBQTtFQUNMWixJQUFBQSxPQUFPLEVBQUUsV0FBWTtFQUNyQmEsSUFBQUEsS0FBSyxFQUFFLFNBQVU7RUFDakJDLElBQUFBLElBQUksRUFBRSxJQUFBO0VBQ047RUFBQSxHQUFBLEVBQ0QsTUFFTyxDQUNKLENBQ0gsQ0FBQyxlQUNObEIsc0JBQUEsQ0FBQUMsYUFBQSxDQUFDQyxnQkFBRyxFQUFrRSxJQUFBLENBQ25FLENBQUMsQ0FBQTtFQUVWOztFQ3ZEQWlCLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUUsQ0FBQTtFQUUzQkQsT0FBTyxDQUFDQyxjQUFjLENBQUN2QixXQUFXLEdBQUdBLFdBQVc7Ozs7OzsifQ==