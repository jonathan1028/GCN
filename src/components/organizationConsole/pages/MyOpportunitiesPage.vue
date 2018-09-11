<template>
  <div class="feedPageLayout">
    <div>
      <notifications-box
        class="notifications-component"
      ></notifications-box>
      <!-- <search
        class="search-component"
      ></search> -->
    </div>
    <div>
      <!------------------------------------------       Modals ------------------------------------ -->
      <div class="modal-area">
        <span v-if="this.$store.state.activeModal === 'create'">
          <opportunity-create></opportunity-create>
        </span>
        <span v-if="this.$store.state.activeModal === 'update'">
          <opportunity-update></opportunity-update>
        </span>
        <!-- ---------------------------------------- Create Medallion Modal ------------------------- -->
          <span v-if="this.$store.state.showCreateMedallionModal">
            <create-medallion
              class="create-medallion-component"
            ></create-medallion>
          </span>
        <!------------------------------------------ Create Volunteering Log Modal ------------ -->
          <!-- <span v-if="this.$store.state.showCreateVolunteeringLog">
            <create-volunteering-log></create-volunteering-log>
          </span> -->
      </div>
      <!------------------------------------------ End of Modal Content  ---------------------------- -->
      <span
        class="searchBlock _box"
        v-if="activeModal === null"
      >
        <form class="search">
          <input name="query" v-model="searchQuery" placeholder="Search">
        </form>
        <button @click="updateActiveModal('create')">
          Create New Opportunity
        </button>
      </span>
      <opportunity-list></opportunity-list>
    </div>
    <div>
      <button-menu></button-menu>
    </div>
  </div>
</template>

<script>
import OpportunityCreate from '../modules/OpportunityCreate'
import OpportunityUpdate from '../modules/OpportunityUpdate'
import OpportunityList from '../modules/OpportunityList'
import NotificationsBox from '../../globalModules/NotificationsBox'
import ButtonMenu from '../../globalModules/ButtonMenu'

export default {
  name: 'MyOpportunitiesPage',
  components: {
    OpportunityCreate, OpportunityUpdate, OpportunityList, NotificationsBox, ButtonMenu
  },
  data () {
    return {
      allOpportunities: [
        {name: 'Opp1'},
        {name: 'Opp2'},
        {name: 'Opp3'}
      ],
      activeModal: this.$store.state.activeModal,
      searchQuery: ''
    }
  },
  methods: {
    updateActiveModal (data) {
      console.log('Test', data)
      this.$store.commit('updateActiveModal', data)
    },
    openCreate () {
      this.$store.commit('toggleCreateOpportunity')
    }
  }
}
</script>

<style lang="scss" scoped>
.feedPageLayout {
  // margin-left: 5vw;
  // margin-right: 5vw;
  display: grid;
  grid-template-columns: 18vw auto 18vw;
  grid-template-areas:
     "left-column center-column right-column";
  grid-column-gap: 2vh;
  grid-row-gap: 2vh;
}
.--no-margin {
  margin-top: 0vh;
}

.searchBlock {
  display: flex;
  justify-content: space-between;
  padding: 1%;
}
.search {
  height: 4vh;
  // padding: 1%;
  input {
    width: 25vw;
    height: 4vh;
    font-size: 2.5vh;
    color: var(--text-color1);
  }
}

.feed-component {
  grid-area: feed-component;
}

.modal-area {
  grid-area: center-column;
}
</style>
