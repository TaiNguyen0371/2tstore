interface IOptionProps {
  children: React.ReactNode;
  value: string;
}
const Option = ({ children, value }: IOptionProps) => {
  return <Option value={value}>{children}</Option>;
};

export default Option;
