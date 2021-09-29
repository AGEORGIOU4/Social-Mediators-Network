export const universityFields = [
  { key: 'id', label: 'ID' },
  { key: 'name' },
  { key: 'registered' },
  { key: 'status' },
  { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'remove', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'show_details', label: '', _style: { width: '0%' }, filter: false, sorter: false }
]

export const studentsFields = [
  { key: 'name' },
  { key: 'surname' },
  { key: 'dob', label: "D.O.B", _style: { width: '10%' } },
  { key: 'edit', label: '', _style: { width: '0%' }, sorter: false, filter: false },
  { key: 'remove', label: '', _style: { width: '0%' } },
]