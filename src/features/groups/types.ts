type GroupId = string;

type GroupName = string;

interface Group {
	id: GroupId;
	isCollapsed: boolean;
	name: GroupName;
}

export {
	type Group,
	type GroupId,
	type GroupName,
};
