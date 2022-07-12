import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default {
    template: `
        <section class="space-y-6">
            <assignment-list :assignments="filters.inProgress" title="In Progress"></assignment-list>
            <assignment-list :assignments="filters.completed" title="Completed"></assignment-list>
            <assignment-create @add="add"></assignment-create>
        </section> 
   `,
    components: {
        AssignmentList,
        AssignmentCreate
    },
    data() {
        return {
            assignments: [
                {name: 'Finish project', complete: false, id: 1, tag: 'science'},
                {name: 'Read chapter 4', complete: false, id: 2, tag: 'math'},
                {name: 'Turn in homework', complete: false, id: 3, tag: 'math'},
            ],
        }
    },

    methods: {
        add(name) {
            this.assignments.push({
                name: name,
                complete: false,
                id: this.assignments.length,
                tag: 'custom'
            })
        }
    },

    computed: {
        filters() {
            return {
                inProgress: this.assignments.filter(assignment => !assignment.complete),
                completed: this.assignments.filter(assignment => assignment.complete)
            }
        }
    },
}