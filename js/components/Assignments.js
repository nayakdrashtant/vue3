import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default {
    template: `
        <section class="flex gap-8">
            <assignment-list :assignments="filters.inProgress" title="In Progress">
                <assignment-create @add="add"></assignment-create>
            </assignment-list>
            <div v-show="showCompleted">
                <assignment-list 
                :assignments="filters.completed"
                 title="Completed"
                 can-toggle
                 @toggle="showCompleted = !showCompleted"
                 ></assignment-list>
            </div>
           
        </section> 
   `,
    components: {
        AssignmentList,
        AssignmentCreate
    },
    data() {
        return {
            assignments: [],
            showCompleted: true
        }
    },

    created() {
        fetch('http://localhost:3001/assignments')
            .then(response => response.json())
            .then(assignments => {
                this.assignments = assignments;
            })
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